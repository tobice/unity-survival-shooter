#pragma strict
var radius : float = 10f;
var power : float = 100f;
var baseDamage: float = 40f;

private var player : GameObject;                          // Reference to the player GameObject.
private var hitParticles : ParticleSystem;                // Reference to the particle system that plays when the enemy is damaged.

private var direction : Vector3;

function Awake ()
{
    player = GameObject.FindGameObjectWithTag ("Player");
    hitParticles = GetComponentInChildren (ParticleSystem);
}

function Start () {

}

function OnTriggerEnter (other : Collider)
{
    if(other.gameObject != player)
    {
    	// We can't let the rocket explode directly at the collided object, so we move it a
    	// little bit back in the direction it came from. 
    	var explosionCenter = other.transform.position - transform.forward.normalized * 0.1;

    	// Find all enemies within the range and apply explosion force
    	var colliders : Collider[] = Physics.OverlapSphere(transform.position, radius);
    	for (var hit : Collider in colliders) {
    		var enemy : EnemyMovement = hit.GetComponent(EnemyMovement);
    		if (enemy != null) {
    			enemy.ApplyExplosion(power, explosionCenter, baseDamage);
    		}
    	}

    	Destroy(gameObject);
    }
}


function Update () {
	transform.position += direction * Time.deltaTime * 20;

	// hitParticles.transform.Rotate(new Vector3(180, 0, 0));
    // hitParticles.transform.position = transform.position;
    // hitParticles.Play();
}

public function Launch (direction) {
	this.direction = direction;
}