import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
const { useEffect, useState } = require("react");

export default function Detail() {
  const params = useParams();
  // Porque si dejo useState vacio no funciona?
  // Se usa este para que sea global porq sino es undifined en el JSX?
  let [mascota, setMascotaDetail] = useState("a");

  function setMascota(data, id) {
    const mascotaEncontrada = data.find((mascota) => mascota.id == id);

    // Verificamos si se encontró la mascota
    if (mascotaEncontrada) {
      setMascotaDetail(mascotaEncontrada);
    }
  }

  useEffect(() => {
    const URL =
      "https://gist.githubusercontent.com/josejbocanegra/829a853c6c68880477697acd0490cecc/raw/99c31372b4d419a855e53f0e891246f313a71b20/mascotas.json";
    fetch(URL)
      .then((data) => data.json())
      .then((data) => {
        setMascota(data, params.mascotaId);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Card style={{ width: "18rem", height: "24rem" }} className="mb-3">
        <Card.Title>{mascota.nombre}</Card.Title>
        <Card.Img
          style={{ height: "14rem" }}
          variant="top"
          src={mascota.foto}
          alt={mascota.descripcion}
        />
        <Card.Text>{mascota.raza}</Card.Text>
      </Card>
    </div>
  );
}
