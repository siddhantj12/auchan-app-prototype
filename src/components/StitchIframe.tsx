

export const StitchIframe = ({ src }: { src: string }) => {
    return (
        <div className="w-full h-screen overflow-hidden bg-white">
            <iframe
                src={src}
                title="Prototype Screen"
                className="w-full h-[calc(100vh-80px)] border-none"
                style={{ pointerEvents: 'auto' }}
            />
        </div>
    );
};
