import User from "../../../models/user.model";
import Course from "../../../models/course.model";
import connectDB from "../../../middleware/connectDB";
import mongoose from "mongoose";

export default async function accesscourse(req, res) {
    await connectDB();
    // if (req.method === "GET") {
    //     try {
    //         const AccessCours = await User.find().populate('userId', 'name email').populate('courseId', 'title slug type videos totalDuration description');
    //         return res.status(200).send({ AccessCours });
    //     } catch (error) {
    //         return res.status(400).json({ message: error.message });
    //     }
    // }
    if (req.method === "POST") {
        try {
            const { userId, courseId, videoNo } = req.body;
            console.log(userId, courseId, videoNo);

            let user = await User.findOne({ userId })
            let flag = false;
            user.courses.map((course) => {
                if (course.courseId.toString(), mongoose.Types.ObjectId(courseId).toString()) {
                    if (videoNo >= 0) {
                        course.completed.includes(videoNo) ? null : course.completed.push(videoNo);
                    }
                    flag = true;
                }
            });
            if (!flag) {
                user.courses.push({ courseId, completed: [] });
            }
            await user.save();
            return res.status(200).send({ message: "Video added successfully" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}