"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
    end: number;
    duration?: number;
    delay?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function CountUp({
    end,
    duration = 2000,
    delay = 0,
    suffix = "",
    prefix = "",
    className = "",
}: CountUpProps) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setHasStarted(true);
                    }, delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        const startValue = 0;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function: easeOutExpo
            const easeOutExpo = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

            const currentValue = Math.floor(startValue + (end - startValue) * easeOutExpo);
            setCount(currentValue);

            if (progress < duration) {
                window.requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        window.requestAnimationFrame(animate);
    }, [hasStarted, end, duration]);

    return (
        <span ref={elementRef} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}
