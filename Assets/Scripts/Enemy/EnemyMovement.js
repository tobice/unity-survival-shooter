private var player : Transform;               // Reference to the player's position.
private var playerHealth : PlayerHealth;      // Reference to the player's health.
private var enemyHealth : EnemyHealth;        // Reference to this enemy's health.
private var nav : NavMeshAgent;               // Reference to the nav mesh agent.
private var rigidBody : Rigidbody;
private var anim : Animator;                              // Reference to the animator.

private var stunnedRemaining : float = 0f;

function Awake ()
{
    // Set up the references.
    player = GameObject.FindGameObjectWithTag ("Player").transform;
    playerHealth = player.GetComponent (PlayerHealth);
    enemyHealth = GetComponent (EnemyHealth);
    nav = GetComponent (NavMeshAgent);
    rigidBody = GetComponent (Rigidbody);
    anim = GetComponent (Animator);
}


function Update ()
{
    if (stunnedRemaining > 0) {
        stunnedRemaining -= Time.deltaTime;
    } else {
        nav.updatePosition = true;
        nav.updateRotation = true;
        rigidBody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ | RigidbodyConstraints.FreezePositionY;

        // If the enemy and the player have health left...
        if(enemyHealth.currentHealth > 0 && playerHealth.currentHealth > 0)
        {
            // ... set the destination of the nav mesh agent to the player.
            nav.SetDestination (player.position);
        }
        // Otherwise...
        else
        {
            // ... disable the nav mesh agent.
            nav.enabled = false;
        }

    }
}

public function ApplyExplosion(power, explosionCenter, baseDamage) {
    // Disable the Nav agent so that we can apply the forces.
    nav.updatePosition = false;
    nav.updateRotation = false;

    // Remove the Y constraint
    rigidBody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;

    // Calculate the impact vector (explosion point - target)
    var impact : Vector3 = transform.position - explosionCenter;
    rigidBody.isKinematic = false;
    rigidBody.AddForce(power * impact / Mathf.Pow(impact.magnitude, 1.2f) + Vector3(0, 100, 0)); // push them a bit up

    // Apply damage on the enemy
    enemyHealth.TakeDamage(baseDamage, transform.position);

    // Stun the enemy for 2 seconds
    stunnedRemaining = 2;
}