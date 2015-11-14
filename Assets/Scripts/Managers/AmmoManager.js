static var ammo: int;        // Ammo left

private var text : Text;       // Reference to the Text component.


function Awake ()
{
    // Set up the reference.
    text = GetComponent (Text);

    // Reset the score.
    ammo = -1;
}


function Update ()
{
	if (ammo == -1) {
	    text.text = "Ammo: inf";
	} else {
	    text.text = "Ammo: " + ammo;
	}
}