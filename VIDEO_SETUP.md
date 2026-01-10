# How to Add Your Demo Video

This guide explains how to add your demonstration video to the website.

## Video Options

The website supports three types of videos:

### 1. YouTube Video (Recommended)
- **Best for**: Public videos, easy sharing
- **How to add**: 
  1. Upload your video to YouTube
  2. Get the video URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
  3. Add it to your environment variables (see below)

### 2. Vimeo Video
- **Best for**: Professional videos, better privacy controls
- **How to add**:
  1. Upload your video to Vimeo
  2. Get the video URL (e.g., `https://vimeo.com/VIDEO_ID`)
  3. Add it to your environment variables (see below)

### 3. Direct Video File
- **Best for**: Self-hosted videos
- **How to add**:
  1. Upload your video file (MP4, WebM, or OGG) to your server or CDN
  2. Get the direct URL (e.g., `https://yourdomain.com/videos/demo.mp4`)
  3. Add it to your environment variables (see below)

## Setup Instructions

### Option 1: Using Environment Variables (Recommended)

1. **For Local Development:**
   - Create or edit `.env.local` file in the root directory
   - Add this line:
     ```
     NEXT_PUBLIC_DEMO_VIDEO_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
     ```
   - Replace `YOUR_VIDEO_ID` with your actual video ID or URL

2. **For Production (Vercel):**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add a new variable:
     - **Name**: `NEXT_PUBLIC_DEMO_VIDEO_URL`
     - **Value**: Your video URL (e.g., `https://www.youtube.com/watch?v=YOUR_VIDEO_ID`)
   - Save and redeploy

### Option 2: Hardcode in Component (Quick Test)

If you want to test quickly, you can directly edit the component files:

1. **For Home Page** (`client/src/components/BusinessShowcase.js`):
   ```javascript
   <VideoShowcase
     videoUrl="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
     title="Watch Our Automation System in Action"
     description="See how enquiries are captured, processed, and responded to automatically - all in real-time"
   />
   ```

2. **For Business Pages** (`client/src/components/BusinessPage.js`):
   ```javascript
   <VideoShowcase
     videoUrl="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
     title="See How It Works"
     description="Watch our automation system in action - from enquiry to response in seconds"
   />
   ```

## Video URL Formats

### YouTube
- Full URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Short URL: `https://youtu.be/VIDEO_ID`
- Both formats work!

### Vimeo
- Full URL: `https://vimeo.com/VIDEO_ID`
- Example: `https://vimeo.com/123456789`

### Direct Video
- Must be a direct link to the video file
- Supported formats: `.mp4`, `.webm`, `.ogg`
- Example: `https://yourdomain.com/videos/demo.mp4`

## Customizing the Video Section

You can customize the video section by editing the `VideoShowcase` component props:

```javascript
<VideoShowcase
  videoUrl="YOUR_VIDEO_URL"
  title="Your Custom Title"
  description="Your custom description"
  autoplay={false}  // Set to true for autoplay (YouTube/Vimeo only)
  className="custom-class"  // Add custom CSS class
/>
```

## Where the Video Appears

The video will appear in two places:

1. **Home Page** (`/`): In the "How It Works" section
2. **Business Pages** (`/dental-clinic`, `/real-estate`, etc.): In the "How It Works" section

## Troubleshooting

### Video Not Showing?
1. Check that the environment variable is set correctly
2. Verify the video URL is accessible
3. For YouTube/Vimeo, ensure the video is public or unlisted (not private)
4. Check browser console for errors

### Video Format Issues?
- YouTube and Vimeo videos work best
- For direct videos, ensure CORS is enabled on your server
- Use MP4 format for best compatibility

### Need Help?
- Check the component file: `client/src/components/VideoShowcase.js`
- Review the CSS: `client/src/components/VideoShowcase.css`
- Ensure the CSS is imported in `pages/_app.js`

## Example Configuration

Here's a complete example for `.env.local`:

```env
# Demo Video URL (YouTube example)
NEXT_PUBLIC_DEMO_VIDEO_URL=https://www.youtube.com/watch?v=dQw4w9WgXcQ

# Or Vimeo example
# NEXT_PUBLIC_DEMO_VIDEO_URL=https://vimeo.com/123456789

# Or Direct video example
# NEXT_PUBLIC_DEMO_VIDEO_URL=https://yourdomain.com/videos/demo.mp4
```

After adding the video URL, restart your development server or redeploy on Vercel.

