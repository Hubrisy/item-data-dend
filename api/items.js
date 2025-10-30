
export default async function handler(req, res) {
  const { file = "items.json" } = req.query;
  const fs = await import("fs/promises");

  try {
    const data = await fs.readFile(`./${file}`, "utf-8");
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    res.status(404).json({ error: "File not found" });
  }
}
