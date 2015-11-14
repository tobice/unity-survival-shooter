var weaponType : String;
var timeToRespawn : float;
var weaponRenderer : Renderer;
private var player : GameObject;
private var gunBarrelEnd : GameObject;                          // Reference to the player GameObject.

private var timer : float = 0f;

function Awake ()
{
    player = GameObject.FindGameObjectWithTag ("Player");
    gunBarrelEnd = GameObject.Find("GunBarrelEnd");
    // weaponRenderer = transform.Find("default").GetComponent(Renderer);
}

function OnTriggerEnter (other : Collider)
{
    // If the entering collider is the player...
    if(other.gameObject == player && IsSpawned())
    {
		gunBarrelEnd.GetComponent(PlayerShooting).SwitchWeapon(weaponType);
		Remove();
    }
}

function Update () {
	if (!IsSpawned()) {
		timer += Time.deltaTime;

		if (timer > timeToRespawn) {
			Spawn();
		}
	}
}

function IsSpawned () {
	return weaponRenderer.enabled;
}

function Remove() {
	weaponRenderer.enabled = false;
	timer = 0;
}

function Spawn() {
	weaponRenderer.enabled = true;
}