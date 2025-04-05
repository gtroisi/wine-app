-- Script SQL per creare la tabella wine_tastings in Supabase

-- Creazione della tabella wine_tastings
CREATE TABLE IF NOT EXISTS public.wine_tastings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wineInfo JSONB NOT NULL, -- Contiene name, winery, region, year, type
  color TEXT,
  reflection TEXT,
  colorDensity TEXT,
  clarity TEXT,
  brightness TEXT,
  perlage TEXT,
  olfactiveNotes TEXT[],
  complexity JSONB, -- Contiene label e score
  quality JSONB, -- Contiene label e score
  sugar TEXT,
  alcohol TEXT,
  acidity TEXT,
  tannin TEXT,
  balance JSONB, -- Contiene label e score
  persistence JSONB, -- Contiene label e score
  sapidity TEXT,
  mouthfeel TEXT,
  tasteQuality JSONB, -- Contiene label e score
  dimension JSONB, -- Contiene label e score
  consumption TEXT,
  score INTEGER,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Creazione dell'indice per migliorare le prestazioni delle query
CREATE INDEX IF NOT EXISTS wine_tastings_user_id_idx ON public.wine_tastings(user_id);
CREATE INDEX IF NOT EXISTS wine_tastings_saved_at_idx ON public.wine_tastings(saved_at);

-- Abilita Row Level Security (RLS)
ALTER TABLE public.wine_tastings ENABLE ROW LEVEL SECURITY;

-- Crea policy per consentire agli utenti di vedere solo i propri vini
CREATE POLICY "Users can view their own wine tastings" 
  ON public.wine_tastings 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Crea policy per consentire agli utenti di inserire i propri vini
CREATE POLICY "Users can insert their own wine tastings" 
  ON public.wine_tastings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Crea policy per consentire agli utenti di aggiornare i propri vini
CREATE POLICY "Users can update their own wine tastings" 
  ON public.wine_tastings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Crea policy per consentire agli utenti di eliminare i propri vini
CREATE POLICY "Users can delete their own wine tastings" 
  ON public.wine_tastings 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Commento alla tabella
COMMENT ON TABLE public.wine_tastings IS 'Tabella per memorizzare le schede di degustazione dei vini degli utenti';