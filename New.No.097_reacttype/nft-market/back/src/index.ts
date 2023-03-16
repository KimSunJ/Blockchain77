import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";
// stream : 데이터를 stream화 해준다.

const app: Express = express();

dotenv.config();

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

app.use(cors({ origin: true, credentials: true })); // credentials: 쿠키 허락
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer();

app.get("/api/list", (req: Request, res: Response) => {
  const data = [
    {
      name: "워어우~",
      description: "짱구에오",
      image:
        "https://gateway.pinata.cloud/ipfs/Qma6AwVXkh5Nc1Z7qJFe7HYK4w194cuoo7bmr92dL6JAE2",
    },
    {
      name: "오호호",
      description: "수업이 오전에 끝난대오~",
      image:
        "https://gateway.pinata.cloud/ipfs/Qma6AwVXkh5Nc1Z7qJFe7HYK4w194cuoo7bmr92dL6JAE2",
    },
  ];
  res.send(data);
});

app.post(
  "/api/mint",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { name, description }: { name: string; description: string } =
      req.body;
    //   console.log(name);
    //   console.log(description);
    //   console.log(req.file);
    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean; // 이 아이는 들어올 수도 있고 없기도 해서 물음표로 해야한다.
    } = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
      pinataMetadata: {
        name: Date.now().toString(),
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
    if (imgResult.isDuplicate) {
      console.log("같은 이미지~!");
    }

    const jsonResult = await pinata.pinJSONToIPFS(
      {
        name,
        description,
        //   image: "https://gateway.pinata.cloud/ipfs/" + imgResult.IpfsHash,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
      },
      {
        pinataMetadata: {
          name: Date.now().toString() + ".json",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      }
    );
    console.log(jsonResult);

    // IpfsHash >> Pinata CID
    res.send("mint complete");
  }
);

app.listen(8080, () => {
  console.log("8080 port server open");
});
