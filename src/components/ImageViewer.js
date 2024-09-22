import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function ImageViewer() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [image, setImage] = useState("https://dummyimage.com/100x100.png");

  // En este caso el hook de efecto solo llama a setup cada vez que se renderiza el
  // componente (setup es la promesa osea el fetch) SOLO cuando height (que es el
  // input text de la altura de la imagen cambia). Es decir, height es la unica depencia.
  useEffect(() => {
    fetch("https://dummyimage.com/" + width + "x" + height + ".png")
      .then((data) => data.blob())
      .then((blob) => {
        setImage(URL.createObjectURL(blob));
      });
    // Así es como funciona. El segundo argumento que le pasamos a useEffect es básicamente una dependencia.
    // Si especifica en el arreglo de dependencia, useEffect se ejecutará solo si hay un cambio en los valores del
    // arreglo de dependencia. Como en el arreglo esta el valor de height, la promesa fetch que es el setup
    // solo se llamara cuando height cambie su valor.
  }, [height]);

  // En este caso el hook de efecto solo llama a setup cuando renderiza el componente la primera vez
  //  (setup es la promesa osea el fetch) pero SOLO la primera vez que se renderiza!
  useEffect(() => {
    fetch("https://dummyimage.com/" + width + "x" + height + ".png")
      .then((data) => data.blob())
      .then((blob) => {
        setImage(URL.createObjectURL(blob));
      });
    // Así es como funciona. El segundo argumento que le pasamos a useEffect es básicamente una dependencia.
    // Si especifica una matriz de dependencia, useEffect se ejecutará solo si hay un cambio en los valores del
    // arreglo de dependencia. Durante el primer renderizado, la matriz está vacía y se ejecuta useEffect.
    // Cuando el componente se vuelve a renderizar, la matriz vuelve a estar vacía, por lo que no hay cambios y el
    // efecto no se ejecutará. Durante la segunda renderización, todavía no hay cambios en los valores de la matriz.
    // Esto evita que el efecto se ejecute durante cualquier renderizado.
  }, []);

  const handleWidthUpdate = (e) => {
    setWidth(e.target.value);
  };

  const handleHeightUpdate = (e) => {
    setHeight(e.target.value);
  };

  return (
    <Col>
      <Card style={{ width: "18rem" }}>
        <Card.Body className="mb-3">
          <Card.Title>Custom Size Image</Card.Title>
          <Card.Text>
            <h2>Width:</h2>
            <input value={width} onChange={handleWidthUpdate}></input>
          </Card.Text>
          <Card.Text>
            <h2>Height:</h2>
            <input value={height} onChange={handleHeightUpdate}></input>
          </Card.Text>
        </Card.Body>
      </Card>
      <img src={image} />
    </Col>
  );
}

export default ImageViewer;
