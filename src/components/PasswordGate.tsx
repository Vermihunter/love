import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { authChallenges } from "../data/anniversary";
import { hashAnswer } from "../lib/hashAnswer";

type Props = {
  children: ReactNode;
};

const STORAGE_KEY = "love-site-unlocked";

export default function PasswordGate({ children }: Props) {
  const [isUnlocked, setIsUnlocked] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true",
  );
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [challengeIndex, setChallengeIndex] = useState(() =>
    Math.floor(Math.random() * authChallenges.length),
  );

  const challenge = authChallenges[challengeIndex];

  const hasPreviousQuestion = useMemo(
    () => authChallenges.length > 1,
    [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const typedHash = await hashAnswer(answer);

    if (typedHash !== challenge.answerHash) {
      setError("Majdnem. Próbáld még egyszer — ez csak kettőnkről szól. 💗");
      return;
    }

    localStorage.setItem(STORAGE_KEY, "true");
    setSuccessMessage(challenge.successMessage ?? "Üdv bent, szerelmem. ❤️");

    window.setTimeout(() => {
      setIsUnlocked(true);
    }, 800);
  };

  const showAnotherQuestion = () => {
    setAnswer("");
    setError("");
    setChallengeIndex((current) => (current + 1) % authChallenges.length);
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <main className="password-page">
      <div className="password-bg">
        <span>♡</span>
        <span>✦</span>
        <span>❤</span>
      </div>

      <section className="password-card" aria-label="Titkos belépő az oldalhoz">
        <p className="password-kicker">csak neked</p>
        <h1>Egy kis kapu az oldalhoz</h1>
        <p className="password-intro">
          A belépő egy közös emlék. Ha te vagy az, akinek ezt készítettem,
          biztosan tudni fogod. Utána minden kis oldalunk megnyílik. ❤️
        </p>

        <form onSubmit={handleSubmit} className="password-form">
          <label htmlFor="anniversary-answer">{challenge.question}</label>
          <input
            id="anniversary-answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            autoComplete="off"
            autoFocus
            placeholder="válasz..."
          />

          {challenge.hint && <p className="password-hint">Tipp: {challenge.hint}</p>}
          {error && <p className="password-error">{error}</p>}
          {successMessage && <p className="password-success">{successMessage}</p>}

          <button type="submit" className="romantic-button primary-button">
            Belépés
          </button>
        </form>

        {hasPreviousQuestion && (
          <button
            type="button"
            className="romantic-button ghost-button"
            onClick={showAnotherQuestion}
          >
            Másik emlék-kérdés
          </button>
        )}
      </section>
    </main>
  );
}
