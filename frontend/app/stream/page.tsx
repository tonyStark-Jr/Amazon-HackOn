import VideoPlayer from '@/components/VideoPlayer';
import { list } from '@vercel/blob';

export default async function StreamPage() {
  const {
    blobs: rootBlobs,
  } = await list({ mode: 'folded' });

  const { blobs } = await list({ mode: 'expanded', prefix: 'videos/videos' });

  return (
    <>
      <VideoPlayer />
      <center>
        <h1>Your Uploads</h1>
      </center>
      <ul>
        {rootBlobs.map(({ pathname, url, size, uploadedAt }) => {
          return (
            <li key={pathname}>
              <table>
                <tbody>
                  <tr>
                    <td>File Name</td>
                    <td>{pathname}</td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>{size}</td>
                  </tr>
                  <tr>
                    <td>Uploaded At</td>
                    <td>{uploadedAt.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>URL</td>
                    <td>{url}</td>
                  </tr>
                </tbody>
              </table>
            </li>
          );
        })}
      </ul>
      <center>
        <h1> Video Contents</h1>
      </center>
      <ul>
        {blobs.map(({ pathname, url, size, uploadedAt }) => {
          return (
            <li key={pathname}>
              <table>
                <tbody>
                  <tr>
                    <td>File Name</td>
                    <td>{pathname}</td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>{size}</td>
                  </tr>
                  <tr>
                    <td>Uploaded At</td>
                    <td>{uploadedAt.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>URL</td>
                    <td>{url}</td>
                  </tr>
                </tbody>
              </table>
            </li>
          );
        })}
      </ul>
    </>
  );
}
