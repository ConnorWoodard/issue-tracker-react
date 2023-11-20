// Footer.jsx
import { FaGithub } from 'react-icons/fa';

function Footer() {
  const githubUrl = 'https://github.com/ConnorWoodard'; // Replace with your GitHub profile URL

  return (
    <footer className="bg-dark text-white p-2" style={{ position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>&copy; Connor Woodard 2023</div>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-white">
        <FaGithub size={32} />
      </a>
    </footer>
  );
}

export default Footer;
