"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function StatusAnimatedText({
  status,
  percentage,
  windowWidth,
}) {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    let newText = "";

    if (status === "loading") {
      if (percentage < 30) newText = "در حال ارتباط با سرورها";
      else if (percentage < 60) newText = "در حال انتخاب سریع ترین سرور";
      else if (percentage < 80) newText = "در حال ثبت آیپی";
      else newText = "در حال تکمیل...";
    } else if (status === "connected") {
      newText = "اینترنت شما به سرور های ققنوس متصل شد";
    } else if (status === "failed") {
      newText = "لطفا فیلترشکن خود را خاموش کنید";
    }

    setText(newText);
  }, [status, percentage]);

  const containerHeight = windowWidth >= 992 ? 50 : 35;

  return (
    <div
      className="text-result"
      style={{
        height: containerHeight,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: -containerHeight }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: containerHeight }}
          transition={{ duration: 0.1 }}
          style={{
            position: "relative",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
