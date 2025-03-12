export function TestsHero() {
  return (
    <section className="bg-beige-100 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-beige-900 md:text-5xl">Психологические тесты</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-beige-700">
          Исследуйте наши научно обоснованные психологические тесты, разработанные для помощи в самопознании и личностном росте.
        </p>
        <div className="mx-auto max-w-3xl rounded-lg bg-beige-50 p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-beige-900">Почему стоит пройти наши тесты?</h2>
          <ul className="mx-auto max-w-2xl space-y-2 text-left text-beige-700">
            <li className="flex items-start">
              <span className="mr-2 text-beige-900">✓</span>
              <span>Разработаны профессиональными психологами на основе современных исследований</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-beige-900">✓</span>
              <span>Получите мгновенные результаты и персонализированные рекомендации</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-beige-900">✓</span>
              <span>Конфиденциальность и безопасность ваших данных гарантированы</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-beige-900">✓</span>
              <span>Используйте результаты для обсуждения с вашим терапевтом</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
