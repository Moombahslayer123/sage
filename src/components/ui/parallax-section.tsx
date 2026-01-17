"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
    imageSrc: string
    speed?: number // Not used directly in simple transform, but good for future extensibility (could adjust range)
    className?: string
    children?: React.ReactNode
    overlay?: boolean
}

export function ParallaxSection({
    imageSrc,
    className,
    children,
    overlay = true,
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // Parallax effect: moves the image slightly slower/offset against scroll
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex items-center justify-center overflow-hidden min-h-[90vh]", // Tall sections for impact
                className
            )}
        >
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 h-[130%] w-full -top-[15%]" // Oversized to allow movement without gaps
            >
                <Image
                    src={imageSrc}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {overlay && <div className="absolute inset-0 bg-black/30" />}
            </motion.div>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
                {children}
            </div>
        </div>
    )
}
