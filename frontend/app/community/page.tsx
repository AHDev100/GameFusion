import StyledGitHub from "../assets/GitHub";
import StyledInstagram from "../assets/Instagram";
import StyledDiscord from "../assets/Discord";

export default function Community() {
    const connectImageURL = "https://swall.teahub.io/photos/small/134-1348814_free-space-backgrounds-group-space-invaders-game-background.jpg";
    return (
        <>
            <div style={{
                backgroundImage: `url(${connectImageURL})`,
                backgroundSize: 'cover', 
                height: 'calc(100vh - 10.5vh)'
            }}>
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center" style={{
                    top: '30%'
                }}>
                    <span className="font-sans text-5xl block text-green-300 italic">BECOME A MEMBER OF THE GAMEFUSION COMMUNITY</span>
                    <span className="mt-7 text-2xl block text-rose-200">Connect with us on social media and join the conversation:</span>
                </div>
                <div className="absolute left-1/3 -translate-x-1/2 -translate-y-1/2 text-center" style={{
                    top: '55%'
                }}>
                    <StyledGitHub /> 
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center" style={{
                    top: '55%'
                }}>
                    <StyledInstagram /> 
                </div>
                <div className="absolute left-2/3 -translate-x-1/2 -translate-y-1/2 text-center" style={{
                    top: '55%'
                }}>
                    <StyledDiscord /> 
                </div>
            </div>
        </>
    ); 
}