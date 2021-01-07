const fs = require("fs")
const path = require("path");
const File = require("../models/File")
// const config = require("config")


class FileService {
  
  
  createDir(file) {
    const filePath = path.join(__dirname, `../files/${file.user}/${file.path}`)
    return new Promise(((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({message: "File was created"})
        } else {
          return reject({message: "File already exist"})
        }
      } catch (e) {
        return reject({message: "File error"})
      }
    }))
  }

  deleteFile(file) {
    if (file.type === "dir") {
      fs.rmdirSync(path.join(__dirname, `../files/${file.user}/${file.path}`))
    } else {
      fs.unlinkSync(path.join(__dirname, `../files/${file.path}/${file.name}`))
    }
  }

}




  module.exports = new FileService()