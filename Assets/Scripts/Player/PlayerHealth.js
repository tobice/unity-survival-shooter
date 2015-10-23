import UnityEngine.UI;
var startingHealth : int = 100;                             // The amount of health the player starts the game with.
var currentHealth : int;                                    // The current health the player has.
var healthSlider : Slider;                                  // Reference to the UI's health bar.
var damageImage : Image;                                    // Reference to an image to flash on the screen on being hurt.
var deathClip : AudioClip;                                  // The audio clip to play when the player dies.
var flashSpeed : float= 5f;                             // The speed the damageImage will fade at.
var flashColour : Color = new Color(1f, 0f, 0f, 0.1f);      // The colour the damageImage is set to, to flash.


private var anim : Animator;                                              // Reference to the Animator component.
private var playerAudio : AudioSource;                                    // Reference to the AudioSource component.
private var playerMovement : PlayerMovement;                              // Reference to the player's movement.
// private var playerShooting : PlayerShooting;                              // Reference to the PlayerShooting script.
private var isDead : boolean;                                                // Whether the player is dead.
private var damaged : boolean;                                               // True when the player gets damaged.


function Awake ()
{
    // Setting up the references.
    anim = GetComponent (Animator);
    playerAudio = GetComponent (AudioSource);
    playerMovement = GetComponent (PlayerMovement);
    // playerShooting = GetComponentInChildren (PlayerShooting);

    // Set the initial health of the player.
    currentHealth = startingHealth;
}


function Update ()
{
    // If the player has just been damaged...
    if (damaged)
    {
        // ... set the colour of the damageImage to the flash colour.
        damageImage.color = flashColour;
    }
    // Otherwise...
    else
    {
        // ... transition the colour back to clear.
        damageImage.color = Color.Lerp (damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
    }

    // Reset the damaged flag.
    damaged = false;
}


public function TakeDamage (amount : int)
{
    // Set the damaged flag so the screen will flash.
    damaged = true;

    // Reduce the current health by the damage amount.
    currentHealth -= amount;

    // Set the health bar's value to the current health.
    healthSlider.value = currentHealth;

    // Play the hurt sound effect.
    playerAudio.Play ();

    // If the player has lost all it's health and the death flag hasn't been set yet...
    if(currentHealth <= 0 && !isDead)
    {
        // ... it should die.
        Death ();
    }
}


function Death ()
{
    // Set the death flag so this function won't be called again.
    isDead = true;

    // Turn off any remaining shooting effects.
    // playerShooting.DisableEffects ();

    // Tell the animator that the player is dead.
    anim.SetTrigger ("Die");

    // Set the audiosource to play the death clip and play it (this will stop the hurt sound from playing).
    playerAudio.clip = deathClip;
    playerAudio.Play ();

    // Turn off the movement and shooting scripts.
    playerMovement.enabled = false;
    // playerShooting.enabled = false;
}