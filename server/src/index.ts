import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import { connectDB } from './db';

dotenv.config()
const app = express();
const port = process.env.PORT || 8000 
 
// configure middlewares
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cors())

// db connection
connectDB();

// declare routes
import certificate from "./routers/certificate.routes"
import contact from "./routers/contact.routes"
import event from "./routers/event.routes"
import gallery from "./routers/gallery.routes"
import member from "./routers/members.routes"
import notice from "./routers/notice.routes"
import project from "./routers/project.routes"
import stock from "./routers/stock.routes"

app.use('/api', certificate);
app.use('/api/contact', contact);
app.use('/api/event', event); 
app.use('/api/gallery', gallery);
app.use('/api/members', member); 
app.use('/api/notice', notice);
app.use('/api/project', project);
app.use('/api/stock', stock); 

app.listen(port, () => console.log('listening on port ' + port));