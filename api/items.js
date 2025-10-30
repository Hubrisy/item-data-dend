
export default async function handler(req, res) {
  const { file = "items.json" } = req.query;

  // Твой GitHub username и репозиторий
  const owner = "Hubrisy";
  const repo = "item-data-dend";
  const branch = "main";

  // URL к GitHub API (вместо raw.githubusercontent.com)
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${file}?ref=${branch}`;

  try {
    const response = await fetch(url, {
      headers: {
        // Добавь секретный токен в Vercel → Settings → Environment Variables
        // KEY = GITHUB_TOKEN
        // VALUE = <твой Personal Access Token>
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw", // сразу вернуть содержимое файла
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `GitHub API error: ${response.statusText}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
