const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const pinFileToIpfs = async () => {
  const formData = new FormData();
  const src = "imgs/hoho.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: "my profil.png",
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: "7b5623a8ae493c4f27af",
          pinata_secret_api_key:
            "5388949a7b7625dd83fe90d26bb2d0780860663c5bbf1e8f371444da08725909",
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// pinFileToIpfs();
// Qma6AwVXkh5Nc1Z7qJFe7HYK4w194cuoo7bmr92dL6JAE2

const pinJson = async () => {
  const formData = {
    pinataMetadata: {
      name: "NFT 1",
    },
    pinataOptions: {
      cidVersion: 0,
    },
    pinataContent: {
      name: "315 NFT",
      description: "피나타 써보는중",
      image:
        "https://gateway.pinata.cloud/ipfs/Qma6AwVXkh5Nc1Z7qJFe7HYK4w194cuoo7bmr92dL6JAE2",
      attributes: [],
    },
  };
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      formData,
      {
        headers: {
          "content-type": "application/json",
          pinata_api_key: "7b5623a8ae493c4f27af",
          pinata_secret_api_key:
            "5388949a7b7625dd83fe90d26bb2d0780860663c5bbf1e8f371444da08725909",
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

pinJson();
// QmWtcTKStz46y1FquUcrizSceCJ1xpnobatBrxDdcTkgUg
