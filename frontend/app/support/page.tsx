export default function Support() {
    const connectImageURL = "https://external-preview.redd.it/anyone-can-help-whit-some-cash-any-amount-v0-LxdXYdPAER1VC9a1p4yUBr0aiz3FhFQfaEAhY8EdmAE.jpg?auto=webp&s=5fca84c27bce7ffe8bde880d0c9f4fe2bf181789";
    return (
        <div style={{
            backgroundImage: `url(${connectImageURL})`,
            backgroundSize: 'cover', 
            height: 'calc(100vh - 10.5vh)'
        }}>
          <div>
            <h1>Support GameFusion</h1>
            <p>
                GameFusion is made possible by the support of our community and contributors. If you'd like to support our platform and help us grow, here are some ways to get involved:
            </p>
            <ul>
                <li>
                <strong>Donate:</strong> Your contributions help us maintain and improve GameFusion. If you're enjoying our platform, consider making a donation to support our work. You can make a donation <a href="https://www.example.com/donate" target="_blank" rel="noopener noreferrer">here</a>.
                </li>
                <li>
                <strong>Contribute:</strong> GameFusion is an open-source project, and we welcome contributions from developers and enthusiasts. You can find our GitHub repository <a href="https://github.com/gamefusion" target="_blank" rel="noopener noreferrer">here</a>. Feel free to submit pull requests, report issues, or participate in discussions.
                </li>
                <li>
                <strong>Contact Us:</strong> If you have questions, feedback, or suggestions, we're here to help. You can reach out to our support team via our <a href="/contact">contact page</a>.
                </li>
            </ul>
            <p>
                Your support is essential to the growth and development of GameFusion. Thank you for being a part of our community!
            </p>
          </div>
        </div>
      );
}