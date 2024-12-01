/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CookieConsentConfig } from 'vanilla-cookieconsent';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}

export const config: CookieConsentConfig = {
  categories: {
      necessary: {
          enabled: true, 
          readOnly: true 
      },
      analytics: {
        services: {
          ga4: {
            label:
              '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
            onAccept: () => {
              console.log("ga4 accepted");
              window.gtag("consent", "update", {
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
                analytics_storage: "granted",
              });
            },
            onReject: () => {
              console.log("ga4 rejected");
            },
            cookies: [
              {
                name: /^_ga/,
              },
            ],
          },
        },
      }
  },
  language: {
      default: 'pt-br',
      translations: {
          'pt-br': {
              consentModal: {
                  title: 'Nós respeitamos sua privacidade',
                  description: 'Utilizamos cookies para garantir a funcionalidade básica do site e melhorar sua experiência. Você pode aceitar todos os cookies ou gerenciar suas preferências individualmente.',
                  acceptAllBtn: 'Aceitar Todos',
                  acceptNecessaryBtn: 'Rejeitar Todos',
                  showPreferencesBtn: 'Gerenciar Preferências'
              },
              preferencesModal: {
                  title: 'Gerenciar Preferências de Cookies',
                  acceptAllBtn: 'Aceitar Todos',
                  acceptNecessaryBtn: 'Rejeitar Todos',
                  savePreferencesBtn: 'Salvar Preferências',
                  closeIconLabel: 'Fechar Modal',
                  sections: [
                      {
                          title: 'Cookies Essenciais',
                          description: 'Esses cookies são necessários para o funcionamento adequado do site e não podem ser desativados.',
                          linkedCategory: 'necessary'
                      },
                      {
                          title: 'Desempenho e Análise',
                          description: 'Esses cookies nos ajudam a analisar como os visitantes interagem com o nosso site. Todos os dados coletados são anonimizados.',
                          linkedCategory: 'analytics'
                      },
                      {
                          title: 'Informações Adicionais',
                          description: 'Para mais detalhes sobre nossa política de cookies e suas opções, visite nossa <a href="/privacy-policy">Política de Privacidade</a>.'
                      }
                  ]
              }
          }
      }
  },
}
