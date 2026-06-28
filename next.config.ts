import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 컨테이너 배포용: 의존성까지 추적한 최소 standalone 서버 출력 (.next/standalone)
  output: "standalone",
};

export default nextConfig;
