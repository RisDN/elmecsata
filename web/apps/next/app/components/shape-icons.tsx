export const answerShapes = [
    { color: 'bg-red-500', shape: 'triangle' },
    { color: 'bg-blue-500', shape: 'diamond' },
    { color: 'bg-yellow-500', shape: 'circle' },
    { color: 'bg-green-500', shape: 'square' },
    { color: 'bg-purple-500', shape: 'pentagon' },
    { color: 'bg-pink-500', shape: 'hexagon' },
];

const ShapeIcon = ({ shape, color, className }: { shape: string; color: string; className?: string }) => {
    switch (shape) {
        case 'triangle':
            return <div className={`${color} ${className} clip-triangle size-6`}></div>;
        case 'diamond':
            return <div className={`${color} ${className} size-6 rotate-45 transform`}></div>;
        case 'circle':
            return <div className={`${color} ${className} size-6 rounded-full`}></div>;
        case 'square':
            return <div className={`${color} ${className} size-6`}></div>;
        case 'pentagon':
            return <div className={`${color} ${className} clip-pentagon size-6`}></div>;
        case 'hexagon':
            return <div className={`${color} ${className} clip-hexagon size-6`}></div>;
        default:
            return <div className={`${color} ${className} size-6 rounded-full`}></div>;
    }
};

export default ShapeIcon;
