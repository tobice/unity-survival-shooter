var damagePerShot : int = 20;                  // The damage inflicted by each bullet.
var timeBetweenBullets : float = 0.15f;        // The time between each shot.
var range : float = 100f;                      // The distance the gun can fire.

private var timer : float;                                    // A timer to determine when to fire.
private var shootRay : Ray;                                   // A ray from the gun end forwards.
private var shootHit : RaycastHit;                            // A raycast hit to get information about what was hit.
private var shootableMask : int;                              // A layer mask so the raycast only hits things on the shootable layer.
private var gunParticles : ParticleSystem;                    // Reference to the particle system.
private var gunLine : LineRenderer;                           // Reference to the line renderer.
private var gunAudio : AudioSource;                           // Reference to the audio source.
private var gunLight : Light;                                 // Reference to the light component.
private var effectsDisplayTime : float = 0.2f;                // The proportion of the timeBetweenBullets that the effects will display for.

function Awake ()
{
    // Create a layer mask for the Shootable layer.
    shootableMask = LayerMask.GetMask ("Shootable");

     // Set up the references.
    gunParticles = GetComponent (ParticleSystem);
    gunLine = GetComponent (LineRenderer);
    gunAudio = GetComponent (AudioSource);
    gunLight = GetComponent (Light);
}


function Update ()
{
    // Add the time since Update was last called to the timer.
    timer += Time.deltaTime;

    // If the Fire1 button is being press and it's time to fire...
    if(Input.GetButton ("Fire1") && timer >= timeBetweenBullets)
    {
        // ... shoot the gun.
        Shoot ();
    }

    // If the timer has exceeded the proportion of timeBetweenBullets that the effects should be displayed for...
    if(timer >= timeBetweenBullets * effectsDisplayTime)
    {
        // ... disable the effects.
        DisableEffects ();
    }
}


public function DisableEffects ()
{
    // Disable the line renderer and the light.
    gunLine.enabled = false;
    gunLight.enabled = false;
}


public function Shoot ()
{
    // Reset the timer.
    timer = 0f;

    // Play the gun shot audioclip.
    gunAudio.Play ();

    // Enable the light.
    gunLight.enabled = true;

    // Stop the particles from playing if they were, then start the particles.
    gunParticles.Stop ();
    gunParticles.Play ();

    // Enable the line renderer and set it's first position to be the end of the gun.
    gunLine.enabled = true;
    gunLine.SetPosition (0, transform.position);

    // Set the shootRay so that it starts at the end of the gun and points forward from the barrel.
    shootRay.origin = transform.position;
    shootRay.direction = transform.forward;

    // Perform the raycast against gameobjects on the shootable layer and if it hits something...
    if(Physics.Raycast (shootRay, shootHit, range, shootableMask))
    {
        // Try and find an EnemyHealth script on the gameobject hit.
        var enemyHealth : EnemyHealth = shootHit.collider.GetComponent (EnemyHealth);

        // If the EnemyHealth component exist...
        if(enemyHealth != null)
        {   
            // ... the enemy should take damage.
            enemyHealth.TakeDamage (damagePerShot, shootHit.point);
        }

        // Set the second position of the line renderer to the point the raycast hit.
        gunLine.SetPosition (1, shootHit.point);
    }
    // If the raycast didn't hit anything on the shootable layer...
    else
    {
        // ... set the second position of the line renderer to the fullest extent of the gun's range.
        gunLine.SetPosition (1, shootRay.origin + shootRay.direction * range);
    }
}