import express from 'express'
import { deleteUser, test, updateUserinfo, getUserListing } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router()

router.get('/test', test)
router.post('/update/:id', verifyToken, updateUserinfo)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListing)


export default router;