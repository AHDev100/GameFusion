export default function About() {
    const connectImageURL = "https://c4.wallpaperflare.com/wallpaper/91/382/434/abstract-wallpaper-preview.jpg";
    return (
        <div style={{
            backgroundImage: `url(${connectImageURL})`,
            backgroundSize: 'cover', 
            height: 'calc(100vh - 10.5vh)'
        }}>
          <h1>About GameFusion</h1>
          <p>
            GameFusion is your all-in-one destination for buying, selling, and connecting with fellow gamers in a dynamic and interactive community.
          </p>
          <p>
            Our mission is to provide gamers with a platform where they can discover, trade, and discuss their favorite games. Whether you're looking to buy the latest releases, sell your collection, or engage with like-minded gamers, GameFusion has you covered.
          </p>
          <p>
            Features of GameFusion include:
          </p>
          <ul>
            <li>Buy and sell video games, consoles, and accessories.</li>
            <li>Connect with gamers from around the world.</li>
            <li>Discover trending games and upcoming releases.</li>
            <li>Participate in discussions, share tips and tricks, and stay updated with gaming news.</li>
          </ul>
          <p>
            Join our thriving community of gamers and level up your gaming experience with GameFusion!
          </p>
        </div>
      );
}