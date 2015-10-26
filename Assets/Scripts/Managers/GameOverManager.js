var playerHealth : PlayerHealth;      // Reference to the player's health.
var restartDelay : float = 5f;          // Time to wait before restarting the level


private var anim : Animator;            // Reference to the animator component.
private var restartTimer : float;       // Timer to count up to restarting the level


function Awake ()
{
    // Set up the reference.
    anim = GetComponent (Animator);
}


function Update ()
{
    // If the player has run out of health...
    if(playerHealth.currentHealth <= 0)
    {
        // ... tell the animator the game is over.
        anim.SetTrigger ("GameOver");

        // .. increment a timer to count up to restarting.
        restartTimer += Time.deltaTime;

        // .. if it reaches the restart delay...
        if(restartTimer >= restartDelay)
        {
            // .. then reload the currently loaded level.
            Application.LoadLevel(Application.loadedLevel);
        }
    }
}