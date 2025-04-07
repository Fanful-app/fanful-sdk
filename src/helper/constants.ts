export const DEFAULT_PAGINATION: number = 10

export const envconfig = {
  test: {
    API_URL: 'https://fanful-app-e67ec6957e56.herokuapp.com',
    SUPABASE_DB_URL: 'https://cidbdoupsrnokpcdkzcz.supabase.co',
    SUPABASE_ANON_PUB_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZGJkb3Vwc3Jub2twY2RremN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NTU5NDEsImV4cCI6MjA0MTEzMTk0MX0.3S_lFqANeEfHaTma4AYdPAuw2LPZD2Z4k8wzKSw60qc'
  },
  production: {
    API_URL: 'https://www.fanfuldevelopment.com',
    SUPABASE_DB_URL: 'https://swrvscfvydbhzfkxbkuh.supabase.co',
    SUPABASE_ANON_PUB_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cnZzY2Z2eWRiaHpma3hia3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MDUzMjAsImV4cCI6MjA1NTM4MTMyMH0.HkNOFznhN6es0yxAGW_ItKB7wE8jJdUkjBM_EAdtft8'
  }
}
