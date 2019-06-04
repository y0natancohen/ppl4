;(define (make-tree : (T1*...*Tn -> List(T1,...,Tn)) : (T1*...*Tn -> List(T1,...,Tn)) list)

;(define (add-subtree: (T1*T2 -> Pair(T1, T2))) : (T1*T2 -> Pair(T1, T2)) cons)

;(define (make-leaf: (T1 -> T1)) (lambda((d : T1)) : T1 d))

;(define (empty-tree : EmptyList) empty)

;(define (first-subtree: (Pair(T1, T2) -> T1)) : ((T1, T2) -> T1) car)

;(define (first-subtree: (Pair(T1, T2) -> T2)) : ((T1, T2) -> T1) cdr)

;(define (leaf-data: (T1 -> T1)) (lambda ((x: T1)) : T1 x))

;(define (composite-tree? : (T1 -> boolean)) : (T1 -> boolean) pair?)

;(define (leaf? : (T1 -> boolean)) (lambda ((t : T1)) : boolean (not (list? t))))

;(define (empty-tree? : (T1 -> boolean)) : (T1 -> boolean) empty?)

(define make-tree list)
(define add-subtree cons)
(define make-leaf (lambda (d) d))
(define empty-tree empty)
(define first-subtree car)
(define rest-subtrees cdr)
(define leaf-data (lambda (x) x))
(define composite-tree? pair?)
(define leaf? (lambda (t) (not (list? t))))
(define empty-tree? empty?)

(define append
  (lambda (lst1 lst2)
    (if (empty? lst1)
        lst2
        (cons (car lst1) (append (cdr lst1) lst2))
        )
    )
  )


;; Purpose: returns a list of all leaves values
;; Signature: flatten(tree)
;; Type: [Pair(T1, T2)] -> List(T1,...,Tn)]
;; (define (flatten (Pair(T1,T2) -> List(T1,...,Tn))
;;   (lambda ((tree : Pair(T1,T2)))
(define flatten
  (lambda (tree)
    (if (empty-tree? tree)
        empty-tree
        (if (not (composite-tree? tree))
            (make-tree tree)
            (append (flatten (first-subtree tree))
                    (flatten (rest-subtrees tree))
                    )
            )
        )
    )
)


;; Purpose: The yield Iterator constructor takes 2 arguments:
;; - The value to return to the caller
;; - The continuation to be executed when the Iterator is resumed (by invoking next())
;; Signature: yield(result, continuation)
;; Type: [T * [Empty -> Iterator<T>] -> Iterator<T>]
;; (define (yield : (T*(Empty -> Iterator<T>) -> Iterator<T>))
;;   (lambda ((res : T) (cont : (Empty -> Iterator<T>)))
(define yield
  (lambda (res cont)
    (cons res cont)))

;; (define (iter->next : (Iterator<T> -> Iterator<T>))
;;   (lambda ((iter : Iterator<T>))
(define iter->next
  (lambda (iter)
    (if (iter->done? iter)
        iter
        (let ((cont (cdr iter)))
          (if (eq? cont 'done)
              cont
              (cont))))))

;; (define (iter->value : (Iterator<T> -> T))
;;   (lambda ((iter : Iterator<T>))
(define iter->value
  (lambda (iter)
    (if (iter->done? iter)
        iter
        (car iter))))

;; (define (iter->done? : (Iterator<T> -> boolean))
;;   (lambda ((iter : Iterator<T>))
(define iter->done?
  (lambda (iter)
    (eq? iter 'done)))


;; (define ((list->iter : (List<T> -> Iterator<T>)) (list : List<T>))
(define (list->iter list)
  (if (null? list)
      'done
      (cons (car list) (lambda () (list->iter (cdr list))))))

;; (define ((iter->list : (Iterator<T> -> List<T>)) (iter : Iterator<T>))
(define (iter->list iter)
  (if (iter->done? iter)
      '()
      (if (iter->done? (iter->next iter))
          (list (iter->value iter))
          (cons (car iter) (iter->list ((cdr iter))))
      )
  )
)



;; (define (lappend : (Iterator<T1> * Iterator<T2> -> Iterator<(T1 | T2)>))
;;   (lambda ((iter1 : Iterator<T1>) (iter2 : Iterator<T2>))
(define lappend
  (lambda (iter1 iter2)
    (if (iter->done? iter1)
        iter2
        (if (iter->done? (iter->next iter1))
            (yield (iter->value iter1) (lambda () iter2))
            (yield (iter->value iter1) (lambda () (lappend (iter->next iter1) iter2)))
        )
    )
  )
)


;; Purpose: returns an iterator of all leaves values
;; Signature: lflatten(tree)
;; Type: [Pair(T1, T2)] -> Iterator(T1)]
;; (define (lflatten : (Pair(T1,T2) -> Iterator(T1))
;;   (lambda ((tree : Pair(T1, T2))
(define lflatten
  (lambda (tree)
    (if (empty-tree? tree)
        'done
        (if (not (composite-tree? tree))
            (yield tree 'done)
            (lappend (lflatten (first-subtree tree))
                    (lflatten (rest-subtrees tree))
                    )
            )
        )
    )
)

;; (define (same-leaves-helper : (Iterator(T1) * Iterator(T2) -> boolean)) (lambda ((iter1 : Iterator(T1)) (iter2 : Iterator(T2)))
(define same-leaves-helper (lambda (iter1 iter2)
                             (if (and (iter->done? iter1) (iter->done? iter2))
                                 #t
                                 (if (not (eq? (iter->value iter1) (iter->value iter2)))
                                     (cons (iter->value iter1) (iter->value iter2))
                                     (same-leaves-helper (iter->next iter1) (iter->next iter2))
                                     )
                                 )
                             ))

;; Purpose: returns true if all leaves in t1 are the same as t2
;; if leaves are not the same, returns the first diff
;; Signature: same-leaves?(t1, t2)
;; Type: [Pair(T1, T2)*Pair(T3, T4)] -> (boolean | Pair(T5, T6))]
;; (define (same-leaves? : (Pair(T1, T2)*Pair(T3, T4) - > (boolean | Pair(T5, T6))))
;;   (lambda ((t1 : Pair(T1, T2)) (t2 : Pair(T3, T4)))
(define same-leaves?
  (lambda (t1 t2)
    (same-leaves-helper (lflatten t1) (lflatten t2))
  )
)

