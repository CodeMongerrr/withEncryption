import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, TextField, Button, Typography } from "@material-ui/core";
import img from "../../images/4127298.jpg";
import { getTokenId } from "../../functions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
      "& input": {
        color: "#fff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
  heading: {
    marginBottom: theme.spacing(3),
    color: "#fff",
    fontFamily: "Arial",
    fontSize: "28px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

const UniversityPortalRahil = ({ mintCertificate, uploadFile, getIdsOfOwner }) => {
  const classes = useStyles();
  const date = () => {
    const result = new Date().toLocaleDateString('en-GB')
    return result;
  }
  const [publicKey, setPublicKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgs, setImgs] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    Certificate_Issuer: "0x",
    Date: "",
    attributes: [
      {
        trait_type: "Program",
        value: "Blockchain",
      },
      {
        trait_type: "Certificate Issuer",
        value: ""
      },
      {
        trait_type: "Date",
        value: date()
      }
    ],
  });

  const down = document.getElementById('down')


  const handleSubmit = async (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    down.href = canvas.toDataURL("img/png", 1.0)
    setImgs(down.href)
    console.log(formData)

    setFormData({
      name,
      description,
      image: imgs,
      Certificate_Issuer: "0x",
      Date: "",
      attributes: [
        {
          trait_type: "Program",
          value: "Blockchain",
        },
        {
          trait_type: "Certificate Issuer",
          value: ""
        },
        {
          trait_type: "Date",
          value: date()
        }
      ],
    })


    console.log(down.href)
    await uploadFile(formData);
    console.log("Mein iss data ki baat kar raha hoon yrr" + getTokenId());

    mintCertificate(publicKey, formData);
    console.log(formData)
  };

  const handleInputChange = (e, property) => {
    setFormData((prevState) => ({
      ...prevState,
      [property]: e.target.value,
    }));
    if (property === "name") {
      setName(e.target.value)
    }
  };

  const canvasRef = useRef(null);
  var image = new Image()
  image.src = "https://girishruti.github.io/imagehostgithub.io/poster.jpg"
  image.crossOrigin = "anonymous"

  image.onload = function () {
    // drawImage()
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    ctx.font = '30px monotype corsiva'
    ctx.fillStyle = '#29e'
    ctx.fillText(name, 40, 180)
  }, [name]);

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h5" className={classes.heading}>
            Certificate Details
          </Typography>
          <TextField
            className={classes.input}
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
          <TextField
            className={classes.input}
            label="Description"
            variant="outlined"
            fullWidth
            value={formData.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
          {/* <TextField
            className={classes.input}
            label="Image URL"
            variant="outlined"
            fullWidth
            value={formData.image}
            onChange={(e) => handleInputChange(e, "image")}
          /> */}
          <TextField
            className={classes.input}
            label="Public Key"
            variant="outlined"
            fullWidth
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <Button
            id="down"
            onSubmit={(e) => handleSubmit(e)}
            className={classes.submitButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <canvas ref={canvasRef} height="350px" width="500px" crossOrigin="anonymous" />
        </form>
      </Container>
    </Box>
  );
};

export default UniversityPortalRahil;