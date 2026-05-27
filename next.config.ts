import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // Headers de Segurança
  // ============================================
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Previne clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Previne MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Controla informações do referer
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy — restringe funcionalidades do navegador
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // Strict Transport Security (ativar em produção com HTTPS)
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),
        ],
      },
    ];
  },

  // ============================================
  // Configurações de Performance
  // ============================================
  
  // Otimização de imagens
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Adicione aqui domínios específicos para imagens remotas, ex:
      // { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "seu-bucket.s3.amazonaws.com" },
    ],
  },

  // Compressão
  compress: true,

  // Powered by header desativado (segurança)
  poweredByHeader: false,
};

export default nextConfig;
