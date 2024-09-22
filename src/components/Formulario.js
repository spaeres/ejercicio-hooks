import Card from "react-bootstrap/Card";

function Formulario() {
  const handleWidthUpdate = (e) => {
    setWidth(e.target.value);
  };
  return (
    <Card style={{ width: "18rem", height: "24rem" }} className="mb-3">
      <Card.Body>
        <Card.Title>Formulario</Card.Title>
        <Card.Text>
          <input value={width} onChange={handleWidthUpdate}></input>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Formulario;
