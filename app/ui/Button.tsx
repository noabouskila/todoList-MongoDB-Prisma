'use client'

import { useFormStatus } from "react-dom";





// export default function Button({ isDisabled }: { isDisabled : boolean}) { tester deactivation btn
export default function Button() {


  // useFormStatus gère l’état temporaire pendant la soumission (pending , data, method , action).
  const {pending} =useFormStatus();

  return (
    <button type="submit" className="btn-success" aria-disabled={pending}>
      {/* disabled={isDisabled} */}
      Créer
    </button>
  );
}
