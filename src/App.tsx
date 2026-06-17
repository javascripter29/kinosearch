/**
 * ������� ��������� ����������
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import {
  HomePage,
  SearchPage,
  FavoritesPage,
  MovieDetailPage,
  NotFoundPage,
} from '@/pages';
import { Loader } from '@/components/ui';

// ������ ��� ��������� �����������
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    }
  >
    {children}
  </Suspense>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-950 flex flex-col">
        <Header />

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <HomePage />
                </PageWrapper>
              }
            />
            <Route
              path="/search"
              element={
                <PageWrapper>
                  <SearchPage />
                </PageWrapper>
              }
            />
            <Route
              path="/favorites"
              element={
                <PageWrapper>
                  <FavoritesPage />
                </PageWrapper>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PageWrapper>
                  <MovieDetailPage />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFoundPage />
                </PageWrapper>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
