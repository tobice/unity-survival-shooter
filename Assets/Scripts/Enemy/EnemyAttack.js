var timeBetweenAttacks : float = 0.5f;     // The time in seconds between each attack.
var attackDamage : int = 10;               // The amount of health taken away per attack.


private var anim : Animator;                              // Reference to the animator component.
private var player : GameObject;                          // Reference to the player GameObject.
private var playerHealth : PlayerHealth;                  // Reference to the player's health.
private var enemyHealth : EnemyHealth;                    // Reference to this enemy's health.
private var playerInRange : boolean;                         // Whether player is within the trigger collider and can be attacked.
private var timer : float;                                // Timer for counting up to the next attack.


function Awake ()
{
    // Setting up the references.
    player = GameObject.FindGameObjectWithTag ("Player");
    playerHealth = player.GetComponent (PlayerHealth);
    enemyHealth = GetComponent(EnemyHealth);
    anim = GetComponent (Animator);
}


function OnTriggerEnter (other : Collider)
{
    // If the entering collider is the player...
    if(other.gameObject == player)
    {
        // ... the player is in range.
        playerInRange = true;
    }
}


function OnTriggerExit (other : Collider)
{
    // If the exiting collider is the player...
    if(other.gameObject == player)
    {
        // ... the player is no longer in range.
        playerInRange = false;
    }
}


function Update ()
{
    // Add the time since Update was last called to the timer.
    timer += Time.deltaTime;

    // If the timer exceeds the time between attacks, the player is in range and this enemy is alive...
    if(timer >= timeBetweenAttacks && playerInRange && enemyHealth.currentHealth > 0)
    {
        // ... attack.
        Attack ();
    }

    // If the player has zero or less health...
    if(playerHealth.currentHealth <= 0)
    {
        // ... tell the animator the player is dead.
        anim.SetTrigger ("PlayerDead");
    }
}


function Attack ()
{
    // Reset the timer.
    timer = 0f;

    // If the player has health to lose...
    if(playerHealth.currentHealth > 0)
    {
        // ... damage the player.
        playerHealth.TakeDamage (attackDamage);
    }
}