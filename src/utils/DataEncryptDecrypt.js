import CryptoJS from "crypto-js";

const customKey = "d909dg78609e47ak47diy4cf87t90c4a";

// ************** For Data Encryption **************
export const encryptData = (ciphertext) => {
    return CryptoJS.AES.encrypt(ciphertext, customKey).toString();
  };
  
  // ************** For Data Decryption **************
  export const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, customKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  export const filterHandler = (data, selectedDiscount, redemptionType, offerType) => {
    let filteredBrands=[];
    filteredBrands = data?.filter((el)=>{
        
      if(selectedDiscount === "upto5" && redemptionType === "ON") return (el.offer_value>=1 && el.offer_value <= 5) && el.redemption_type === "ON"
      else if(selectedDiscount === "upto5" && redemptionType === "OFF") return (el.offer_value>=1 && el.offer_value <= 5) && el.redemption_type === "OFF"
      else if(selectedDiscount === "6-10" && redemptionType === "ON") return (el.offer_value>=6 && el.offer_value <= 10) && el.redemption_type === "ON"
      else if(selectedDiscount === "6-10" && redemptionType === "OFF") return (el.offer_value>=6 && el.offer_value <= 10) && el.redemption_type === "OFF"
      else if(selectedDiscount === "11-25" && redemptionType === "ON") return (el.offer_value>=11 && el.offer_value <= 25) && el.redemption_type === "ON"
      else if(selectedDiscount === "11-25" && redemptionType === "OFF") return (el.offer_value>=11 && el.offer_value <= 25) && el.redemption_type === "OFF"
      else if(selectedDiscount === "26-Above" && redemptionType === "ON") return (el.offer_value>=26 ) && el.redemption_type === "ON"
      else if(selectedDiscount === "26-Above" && redemptionType === "OFF") return (el.offer_value>=26) && el.redemption_type === "OFF"
      else if(selectedDiscount === "upto5") return el.offer_value>=1 && el.offer_value <= 5
      else if(selectedDiscount === "6-10") return el.offer_value>=6 && el.offer_value <= 10
      else if(selectedDiscount === "11-25") return el.offer_value>=11 && el.offer_value <= 25
      else if(selectedDiscount === "26-Above") return el.offer_value>=26 
      else if(redemptionType === "ON") return el.redemption_type === "ON"
      else if(redemptionType === "OFF") return el.redemptionType === "OFF"
      else if(offerType === "OFFER") return el.offer_type === "OFFER"
      else if(offerType === "DIS") return el.offer_type === "DIS"
      else return el;
    })
    return filteredBrands;
  }