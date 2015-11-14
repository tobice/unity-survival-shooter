#pragma strict

private var baseYPosition : float;
private var timer : float = 0;

function Start () {
	baseYPosition = transform.position.y;
}

function Update () {
	transform.Rotate(Vector3.up * Time.deltaTime * 100);
	timer = (timer + Time.deltaTime * 5) % (2 * Mathf.PI);
	transform.position.y = baseYPosition + Mathf.Sin(timer) / 3;
}