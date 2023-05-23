// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincode={
    "121102":["Haryana","Palwal"],
    "121104":["Haryana","Faridabad"]
  }
    res.status(200).json(pincode)
  }
  
  