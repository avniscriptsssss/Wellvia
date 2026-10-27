require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = 3000;
const Report = require("./report");
const Contact = require("./contact");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/api/health", (req, res) => {
    res.json({ message: "Wellvia backend is running! 💗" });
});

app.post("/api/reports", async (req, res) => {
    try {
        const report = await Report.create(req.body);
        res.status(201).json({
            message: "Report submitted successfully! 💗",
            report
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get("/api/reports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/api/reports/:id", async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.put("/api/reports/:id", async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.json({ message: "Report updated! 💗", report });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.delete("/api/reports/:id", async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.json({ message: "Report deleted successfully! 💗" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post("/api/contacts", async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({
            message: "Message sent successfully! 💗",
            contact
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.put("/api/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Contact updated! 💗", contact });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.delete("/api/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully! 💗" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully! 💗");

        app.listen(PORT, () => {
            console.log(`Wellvia running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });