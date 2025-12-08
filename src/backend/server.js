import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import requestIp from "request-ip"; // وارد کردن پکیج request-ip

const app = express();
const PORT = process.env.PORT || 5000;

// تنظیم CORS برای اجازه دادن به تمام درخواست‌ها از سایر دامین‌ها
app.use(cors());

// استفاده از request-ip برای شناسایی IP
app.use(requestIp.mw());

// مسیر API که React استفاده می‌کنه
app.get("/api/ipinfo", async (req, res) => {
    try {
        // دریافت IP واقعی کاربر
        let ip = req.clientIp; // استفاده از request-ip برای گرفتن IP
        console.log(`Request received from IP: ${ip}`); // چاپ IP برای تست

        // درخواست به API برای دریافت اطلاعات جغرافیایی IP
        const response = await fetch(`https://ipwhois.app/json/${ip}`);
        const data = await response.json();

        console.log("IP WHOIS data:", data); // چاپ داده‌های کامل API برای بررسی

        const country = data.country;
        const isInIran = country === "Iran";

        // ارسال پاسخ به فرانت
        res.json({
            message: isInIran ? "کاربر از ایران است." : "کاربر از خارج از ایران است.",
            ip: ip,
            country: country,
            isInIran: isInIran,
        });

    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch IP info"
        });
    }
});

// راه‌اندازی سرور در پورت مشخص
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});