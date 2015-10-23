var speed : float = 6f;            // The speed that the player will move at.

private var movement : Vector3;                   // The vector to store the direction of the player's movement.
private var anim : Animator;                      // Reference to the animator component.
private var playerRigidbody : Rigidbody;          // Reference to the player's rigidbody.
private var floorMask : int;                      // A layer mask so that a ray can be cast just at gameobjects on the floor layer.
private var camRayLength : float = 100f;          // The length of the ray from the camera into the scene.


function Awake ()
{
    // Create a layer mask for the floor layer.
    floorMask = LayerMask.GetMask ("Floor");

    // Set up references.
    anim = GetComponent (Animator);
    playerRigidbody = GetComponent (Rigidbody);
}


function FixedUpdate ()
{
    // Store the input axes.
    var h : float = Input.GetAxisRaw ("Horizontal");
    var v : float = Input.GetAxisRaw ("Vertical");

    // Move the player around the scene.
    Move (h, v);

    // Turn the player to face the mouse cursor.
    Turning ();

    // Animate the player.
    Animating (h, v);
}


function Move (h : float, v : float)
{
    // Set the movement vector based on the axis input.
    movement.Set (h, 0f, v);
    
    // Normalise the movement vector and make it proportional to the speed per second.
    movement = movement.normalized * speed * Time.deltaTime;

    // Move the player to it's current position plus the movement.
    playerRigidbody.MovePosition (transform.position + movement);
}


function Turning ()
{
    // Create a ray from the mouse cursor on screen in the direction of the camera.
    var camRay : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);

    // Create a RaycastHit variable to store information about what was hit by the ray.
    var floorHit : RaycastHit;

    // Perform the raycast and if it hits something on the floor layer...
    if(Physics.Raycast (camRay, floorHit, camRayLength, floorMask))
    {
        // Create a vector from the player to the point on the floor the raycast from the mouse hit.
        var playerToMouse : Vector3  = floorHit.point - transform.position;

        // Ensure the vector is entirely along the floor plane.
        playerToMouse.y = 0f;

        // Create a quaternion (rotation) based on looking down the vector from the player to the mouse.
        var newRotation : Quaternion = Quaternion.LookRotation (playerToMouse);

        // Set the player's rotation to this new rotation.
        playerRigidbody.MoveRotation (newRotation);
    }
}


function Animating (h : float, v : float)
{
    // Create a boolean that is true if either of the input axes is non-zero.
    var walking : boolean = h != 0f || v != 0f;

    // Tell the animator whether or not the player is walking.
    anim.SetBool ("IsWalking", walking);
}