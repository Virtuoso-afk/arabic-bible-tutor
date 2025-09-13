# AWS IAM Setup for App Runner

This guide shows how to set up IAM roles for secure AWS Polly access in App Runner.

## Option 1: IAM Role (Recommended - No Credentials in Code)

### Step 1: Create IAM Policy
1. Go to **IAM Console** → **Policies** → **Create Policy**
2. Use JSON editor and paste this policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "polly:SynthesizeSpeech",
                "polly:DescribeVoices",
                "polly:GetLexicon",
                "polly:ListLexicons"
            ],
            "Resource": "*"
        }
    ]
}
```

3. Name it: `ArabicBibleTutorPollyPolicy`
4. Click **Create Policy**

### Step 2: Create IAM Role
1. Go to **IAM Console** → **Roles** → **Create Role**
2. Choose **AWS Service** → **App Runner**
3. Attach the policy: `ArabicBibleTutorPollyPolicy`
4. Name it: `ArabicBibleTutorAppRunnerRole`
5. Click **Create Role**

### Step 3: Copy Role ARN
Copy the Role ARN (looks like):
```
arn:aws:iam::123456789012:role/ArabicBibleTutorAppRunnerRole
```

You'll need this when creating the App Runner service.

## Option 2: Access Keys (Simpler but Less Secure)

If you prefer using access keys, set these environment variables in App Runner:
- `AWS_ACCESS_KEY_ID` = your access key
- `AWS_SECRET_ACCESS_KEY` = your secret key
- `AWS_REGION` = us-east-1

## App Runner Service Configuration

When creating the App Runner service:

1. **Source**: GitHub repository
2. **Runtime**: Python 3.11
3. **Build Command**: `pip install -r requirements.txt`  
4. **Start Command**: `python aws-polly-server.py`
5. **Port**: 8000
6. **Instance Role**: Select `ArabicBibleTutorAppRunnerRole` (if using IAM)
7. **Environment Variables**: (only if not using IAM role)
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`

## Health Check
App Runner will automatically monitor: `https://your-app.region.awsapprunner.com/health`

## Testing
After deployment, test these endpoints:
- `/health` - Service health check
- `/voices` - Available Arabic voices
- `/synthesize` - Text-to-speech synthesis