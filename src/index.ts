import path from 'path';
import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig({ path: path.resolve(__dirname, '..', '.env') });

import { createApp } from './app';
import { FixerCurrencyService } from './services/fixer-currency.service';

const fixerCurrencyService = new FixerCurrencyService(process.env.FIXER_API_KEY!);
const app = createApp(fixerCurrencyService);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
