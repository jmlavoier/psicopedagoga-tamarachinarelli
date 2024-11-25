import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

import jopSoftwarecookieconsent from '@jop-software/astro-cookieconsent';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'static',

  integrations: [tailwind({
    applyBaseStyles: false,
  }), sitemap(), mdx(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons': [
        'template',
        'gallery',
        'approval',
        'document',
        'advertising',
        'currency-exchange',
        'voice-presentation',
        'business-contact',
        'database',
      ],
    },
  }), ...whenExternalScripts(() =>
    partytown({
      config: { forward: ['dataLayer.push'] },
    })
  ), compress({
    CSS: true,
    HTML: {
      'html-minifier-terser': {
        removeAttributeQuotes: false,
      },
    },
    Image: false,
    JavaScript: true,
    SVG: false,
    Logger: 1,
  }), astrowind({
    config: './src/config.yaml',
  }), jopSoftwarecookieconsent({
    categories: {
        necessary: {
            enabled: true, 
            readOnly: true 
        },
        analytics: {
            enabled: false, 
            readOnly: false 
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
                            description: 'Para mais detalhes sobre nossa política de cookies e suas opções, visite nossa <a href="#privacy-policy">Política de Privacidade</a>.'
                        }
                    ]
                }
            }
        }
    },
})],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
