var crypto = require("crypto");
const { generateSigningMessage } = require("../utils/auth");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const nonce = async (req, res, next) => {
  try {
    console.log(
      "Request has been made to generate wallet signing message. body=",
      req.body
    );
    const { address } = req.body;
    if (!address) {
      console.error("Trying to get nonce without address, network");
      return res.status(400).send({
        status: false,
        message: "Invalid payload. body should include 'address' and 'network'",
      });
    }
    const nonce = crypto.randomBytes(16).toString("hex");
    const message = generateSigningMessage(nonce);
    // token expires in 1 hour
    let expires_at = new Date();
    expires_at.setHours(expires_at.getHours() + 1);
    const whereParams = { wallet: address.toLowerCase() };
    // const data = {
    //   ...whereParams,
    //   expires_at,
    //   token: nonce,
    //   type: "wallet_login",
    // };
    // await createToken(whereParams, data);
    console.log(
      "Successfully generated a nonce for wallet login - nonce=",
      nonce
    );
    res.status(200).json({ status: true, message, token: nonce });
  } catch (e) {
    console.error(
      `Failed to generated a nonce for wallet login - nonce=${nonce}, error=${e}`
    );
    return res
      .status(500)
      .send({ status: false, message: "Internal server error" });
  }
};

module.exports = { nonce };
