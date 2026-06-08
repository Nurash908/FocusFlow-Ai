import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        confetti({
            particleCount: 5,
            startVelocity: 30,
            spread: 360,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
    }, 250);
};
