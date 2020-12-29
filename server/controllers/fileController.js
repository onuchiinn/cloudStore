const fileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")
const path = require("path");
const fs = require("fs")


class FileController {

    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }


    async getFiles(req, res) {
        try {
            // const {sort} = req.query
            console.log("22")
            console.log(req.query)
            let files = await File.find({user: req.user.id, parent: req.query.parent})
            // switch (sort) {
            //     case "name":
            //         files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name:1})
            //         break
            //     case "type":
            //         files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type:1})
            //         break
            //     case "date":
            //         files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date:1})
            //         break
            //     default:
            //         files = await File.find({user: req.user.id, parent: req.query.parent})
            //         break;
            // }
            console.log(files)
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can't get files"})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})


            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: "Disk full. Can't add file"})
            }

            user.usedSpace = user.usedSpace + file.size

            let pathDir
            if (parent) {
                pathDir = path.join(__dirname, `../files/${user._id}/${parent.path}/${file.name}`)
            } else {
                pathDir = path.join(__dirname, `../files/${user._id}/${file.name}`)
            }

            if (fs.existsSync(pathDir)) return res.status(400).json({message: "File already exist"})

            file.mv(pathDir)

            const type = file.name.split(".").pop()
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: parent ? `${user._id}/${parent.path}` : `${user._id}/`,
                parent: parent ? parent._id : null,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            res.json(dbFile)

        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Error upload file"})
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            let pathName = path.join(__dirname, `../files/${file.path}/${file.name}`)
            if (fs.existsSync(pathName)) {
                return res.download(pathName, file.name)
            }
            return res.status(400).json({message: "Download error"})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Download error"})
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                return res.status(400).json({message: "File not found"})
            }
            fileService.deleteFile(file)
            await file.remove()
            return res.json({message: "File was deleted"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Dir is not empty"})
        }
    }


}


module.exports = new FileController()