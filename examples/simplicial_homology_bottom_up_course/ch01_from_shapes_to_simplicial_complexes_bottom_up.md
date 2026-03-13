# Chapter 1: From Shapes to Combinatorial Skeletons

## Learning objectives
- Translate geometric pictures into finite simplicial data.
- Distinguish abstract simplices from geometric realization.
- Control orientation choices and signs for later boundary formulas.

## Prerequisite chapters
- None

## Chapter target concept/theorem
Definition of simplicial complex, oriented simplex, and simplex dimension.

## 1. Destination and Why It Matters

Homology will eventually detect holes by algebra. But algebra needs a strict input language. This chapter builds that language by turning "a shape" into finite combinatorial data that can be checked, indexed, and reused.

The destination is a legal simplicial complex with orientation conventions. If this stage is weak, every later chain and boundary computation will be unreliable.

Forward anchor: in Chapter 2 we convert these oriented simplices into chain groups and the boundary operator.

## 2. Foundation Layer

### Primitive 1: Finite labeled vertex set
- What it is: A finite set $V=\{v_0,\dots,v_m\}$ with stable labels.
- Why it is load-bearing: Every simplex is built from these labels; unstable labels break sign bookkeeping.
- Tiny numeric example: If $V=\{v_0,v_1,v_2,v_3\}$, then $\{v_0,v_2,v_3\}$ and $\{v_0,v_1,v_3\}$ are distinct faces.
- Failure mode: Relabeling vertices midway can make one edge appear as two unrelated edges.

### Primitive 2: Face as subset relation
- What it is: A face is a nonempty subset of a simplex's vertex set.
- Why it is load-bearing: Later boundary formulas are exactly signed sums of codimension-1 faces.
- Tiny numeric example: For $\{v_0,v_1,v_2\}$, the 1-faces are $\{v_0,v_1\}$, $\{v_0,v_2\}$, $\{v_1,v_2\}$.
- Failure mode: Including a triangle but omitting one edge violates closure and breaks internal boundaries.

### Primitive 3: Affine independence
- What it is: Points $p_0,\dots,p_k$ are affine independent when no nontrivial affine combination gives $0$.
- Why it is load-bearing: It prevents degenerate simplices that fake higher dimension.
- Tiny numeric example: $(0,0),(1,0),(0,1)$ are affine independent; $(0,0),(1,0),(2,0)$ are not.
- Failure mode: Calling three collinear points a 2-simplex creates false area and false 2-cells.

### Primitive 4: Orientation via permutation parity
- What it is: Ordering vertices modulo even permutations; odd permutations flip sign.
- Why it is load-bearing: Alternating signs in $\partial_n$ come from this parity rule.
- Tiny numeric example: $[v_0,v_1,v_2]=-[v_1,v_0,v_2]$ and $[v_0,v_1,v_2]=[v_1,v_2,v_0]$.
- Failure mode: Ignoring parity prevents cancellation in boundary-of-boundary computations.

### Primitive 5: Dimension by vertex count
- What it is: A simplex with $k+1$ vertices has dimension $k$.
- Why it is load-bearing: Chain groups and boundaries are degree-indexed.
- Tiny numeric example: Edge has $2$ vertices so dimension $1$; tetrahedron has $4$ vertices so dimension $3$.
- Failure mode: Degree mislabeling shifts maps and invalidates chain indexing.

### Primitive 6: Closure under faces
- What it is: If $\sigma\in K$ and $\tau\subseteq\sigma$ nonempty, then $\tau\in K$.
- Why it is load-bearing: Ensures boundaries of simplices stay inside the same complex.
- Tiny numeric example: If $\{v_0,v_1,v_2\}\in K$, then all $3$ edges and $3$ vertices must be in $K$.
- Failure mode: Missing faces make $\partial$ leave the complex.

## 3. Bottom-Up Thinking Stages

### Stage 1: Diagnose why pictures are insufficient
**Motivation**:
Bottleneck: Pictures are intuitive but not machine-checkable.
Why-now trigger: Two drawings can look different while encoding the same incidence structure.
Rejected shortcut: Compare only visual shape similarity; this fails under redrawings.
Stage objective: Isolate a purely combinatorial representation.
Payoff signal: You can specify a shape as finite symbols without coordinates.

**Intuition**:
Mental model: Treat the shape as a scaffold of joints and beams.
Where it fails: A scaffold without higher-face data cannot distinguish hollow from filled regions.

**Construction step**:
Uses: Primitive 1 and Primitive 2.
Start with a finite vertex set $V$, and represent candidate building blocks as subsets $\sigma\subseteq V$ with $|\sigma|=k+1$ for $k$-simplices.

**Worked example**:
Example 1
Setup: Compare two explicit triangulations of a square with vertex set $V=\{v_0,v_1,v_2,v_3\}$.
Vertices: $V=\{v_0,v_1,v_2,v_3\}$ for both triangulations.
Edges: Triangulation A uses diagonal $(v_0,v_2)$ with $E_A=\{(v_0,v_1),(v_1,v_2),(v_2,v_3),(v_3,v_0),(v_0,v_2)\}$; Triangulation B uses diagonal $(v_1,v_3)$ with $E_B=\{(v_0,v_1),(v_1,v_2),(v_2,v_3),(v_3,v_0),(v_1,v_3)\}$.
Triangles: $T_A=\{\{v_0,v_1,v_2\},\{v_0,v_2,v_3\}\}$ and $T_B=\{\{v_0,v_1,v_3\},\{v_1,v_2,v_3\}\}$.
Compute: First, both triangulations satisfy $|V|=4$. Then $|E_A|=|E_B|=5$ and $|T_A|=|T_B|=2$, so both are valid 2-dimensional triangulations with different diagonal choices.
Interpret: Edge-vertex incidence is more stable than drawing geometry.
Common mistake: Concluding non-equivalence from diagonal orientation alone.

Example 2
Setup: Hollow triangle versus filled triangle on vertices $a,b,c$.
Compute: First, both complexes have vertex set $\{a,b,c\}$ and edge set $\{[a,b],[b,c],[c,a]\}$. Then the filled version adds the 2-simplex $[a,b,c]$ while the hollow version has no 2-simplices.
Interpret: Higher-dimensional simplex data is essential.
Common mistake: Assuming same graph implies same topological content.

**What this unlocks next**:
We can define simplices rigorously rather than descriptively.
Remaining gap: Need a nondegeneracy rule for geometric simplices.

### Stage 2: Separate abstract simplex from geometric simplex
**Motivation**:
Bottleneck: Subset syntax alone does not prevent degenerate simplices.
Why-now trigger: Collinear triples were incorrectly treated as triangles.
Rejected shortcut: Declare any three vertices a 2-simplex.
Stage objective: Introduce affine-independence criterion for geometric realization.
Payoff signal: Every declared geometric simplex has intended dimension.

**Intuition**:
Mental model: A simplex is the minimal convex span of independent points.
Where it fails: Abstract complexes have no coordinates, so independence is not checked there.

**Construction step**:
Uses: Primitive 3 and Primitive 5.
For points $p_0,\dots,p_k\in\mathbb{R}^n$, define geometric simplex $\sigma=\operatorname{conv}\{p_0,\dots,p_k\}$ only when the points are affine independent, so $\dim(\sigma)=k$.

**Worked example**:
Example 1
Setup: Point set $P=\{(0,0),(1,0),(0,1)\}$.
Compute: First, form difference vectors from $(0,0)$: $u_1=(1,0)$ and $u_2=(0,1)$. Then $\det\begin{bmatrix}1&0\\0&1\end{bmatrix}=1\neq0$, so $u_1,u_2$ are independent and the simplex dimension is $2$.
Interpret: Valid geometric triangle.
Common mistake: Testing only pairwise distinctness instead of affine independence.

Example 2
Setup: Point set $Q=\{(0,0),(1,0),(2,0)\}$.
Compute: First, form vectors $w_1=(1,0)$ and $w_2=(2,0)$. Then $w_2=2w_1$, so affine span is one-dimensional and this set cannot define a 2-simplex.
Interpret: Not a valid 2-simplex.
Common mistake: Calling any 3-point set a triangle.

**What this unlocks next**:
A clean distinction between abstract combinatorics and geometric realization.
Remaining gap: Need a global object that assembles many simplices with closure.

### Stage 3: Define simplicial complex by closure
**Motivation**:
Bottleneck: Isolated simplices do not define a usable ambient structure.
Why-now trigger: Boundary of a triangle referenced edges that were missing from the set.
Rejected shortcut: Allow arbitrary simplex collections without closure rules.
Stage objective: Enforce face-closure as a hard constraint.
Payoff signal: Every simplex in the set carries all of its nonempty faces.

**Intuition**:
Mental model: A legal complex is a family tree with all ancestors included.
Where it fails: Closure alone does not yet track orientation or signs.

**Construction step**:
Uses: Primitive 2 and Primitive 6.
Define an abstract simplicial complex $K$ as a finite family of nonempty subsets of $V$ such that $\tau\subseteq\sigma\in K\Rightarrow\tau\in K$.

**Worked example**:
Example 1
Setup: $K=\{\{v_0\},\{v_1\},\{v_2\},\{v_0,v_1\},\{v_1,v_2\},\{v_0,v_2\},\{v_0,v_1,v_2\}\}$.
Compute: First, list nonempty faces of $\{v_0,v_1,v_2\}$: three vertices and three edges. Then check each appears in $K$, so closure holds for that simplex.
Interpret: Valid filled-triangle complex.
Common mistake: Forgetting singleton faces and still claiming validity.

Example 2
Setup: Triangle set missing edge $\{v_0,v_2\}$.
Compute: First, required faces include $\{v_0,v_2\}$ because $\{v_0,v_2\}\subseteq\{v_0,v_1,v_2\}$. Then that edge is missing, so closure fails and the collection is not a simplicial complex.
Interpret: Not a simplicial complex.
Common mistake: Assuming closure can be repaired later during computation.

**What this unlocks next**:
A legal domain where boundaries can remain internal.
Remaining gap: Need orientation conventions for signed algebra.

### Stage 4: Attach orientation data
**Motivation**:
Bottleneck: Unsigned simplices cannot support sign-sensitive cancellation.
Why-now trigger: Shared faces in adjacent simplices need opposite contributions.
Rejected shortcut: Add signs ad hoc case by case.
Stage objective: Define orientation through ordered vertices and parity.
Payoff signal: Reversing order reliably flips sign.

**Intuition**:
Mental model: Orientation is a chosen traversal direction class.
Where it fails: Global orientation of a space can fail even when local simplex orientation is defined.

**Construction step**:
Uses: Primitive 4.
For a $k$-simplex, declare $[v_{\pi(0)},\dots,v_{\pi(k)}]=\operatorname{sgn}(\pi)[v_0,\dots,v_k]$. Odd permutations multiply by $-1$.

**Worked example**:
Example 1
Setup: Edge with orderings $[v_0,v_1]$ and $[v_1,v_0]$.
Compute: First, swap positions $0$ and $1$, an odd permutation with sign $-1$. Then $[v_1,v_0]=- [v_0,v_1]$ follows from orientation parity.
Interpret: Opposite traversal is additive inverse.
Common mistake: Treating reversed orientation as independent basis element.

Example 2
Setup: Oriented simplex on vertex set $\{v_0,v_1,v_2\}$ and cyclic permutation simplex $[v_1,v_2,v_0]$.
Compute: First, the permutation $(0\,1\,2)$ is a 3-cycle with parity $+1$. Then $[v_1,v_2,v_0]=+[v_0,v_1,v_2]$, so orientation is preserved.
Interpret: Not every reorder flips orientation.
Common mistake: Assuming any reorder gives minus sign.

**What this unlocks next**:
Sign-consistent face incidence in higher formulas.
Remaining gap: Need systematic indexing of faces across dimensions.

### Stage 5: Index codimension-1 faces explicitly
**Motivation**:
Bottleneck: Manual face tracing becomes error-prone for high-dimensional simplices.
Why-now trigger: We need consistent face labels before defining boundaries.
Rejected shortcut: List faces in arbitrary order each time.
Stage objective: Define face deletion operator $d_i$.
Payoff signal: Every codimension-1 face has deterministic index.

**Intuition**:
Mental model: Delete one vertex position at a time, record the slot index.
Where it fails: Indexing alone does not encode coefficients; algebra comes in Chapter 2.

**Construction step**:
Uses: Primitive 2 and Primitive 5.
For $\sigma=[v_0,\dots,v_k]$, define $d_i\sigma=[v_0,\dots,\hat v_i,\dots,v_k]$ for $0\le i\le k$.

**Worked example**:
Example 1
Setup: $\sigma=[v_0,v_1,v_2,v_3]$.
Compute: $d_0\sigma=[v_1,v_2,v_3]$, $d_1\sigma=[v_0,v_2,v_3]$, $d_2\sigma=[v_0,v_1,v_3]$, $d_3\sigma=[v_0,v_1,v_2]$.
Interpret: A 3-simplex has exactly $4$ codimension-1 faces.
Common mistake: Deleting two vertices and calling it codimension-1.

Example 2
Setup: Adjacent triangles sharing edge $[v_1,v_2]$.
Compute: First, in $\tau_1=[v_0,v_1,v_2]$ the shared edge is $d_0\tau_1=[v_1,v_2]$. Then in $\tau_2=[v_1,v_3,v_2]$ the same edge appears as $d_1\tau_2=[v_1,v_2]$, showing index-dependent appearance.
Interpret: Shared-face accounting is now explicit.
Common mistake: Forgetting induced orientation when matching shared edge terms.

**What this unlocks next**:
Ready-made inputs for alternating boundary sums.
Remaining gap: Need additive containers for combining many oriented simplices.

### Stage 6: Stress-test definitions on canonical complexes
**Motivation**:
Bottleneck: Definitions may be syntactically correct but conceptually brittle.
Why-now trigger: Learners often misclassify interval, hollow triangle, and filled triangle.
Rejected shortcut: Move to algebra before validating object-level understanding.
Stage objective: Verify definitions on small benchmark complexes.
Payoff signal: These examples can be classified immediately and consistently.

**Intuition**:
Mental model: Unit tests for definitions.
Where it fails: Passing examples does not prove theorem-level claims.

**Construction step**:
Uses: Stages 1-5.
Construct three benchmark complexes: interval $K_I$, hollow triangle $K_H$, filled triangle $K_F$, and compare dimensions and simplex inventories.

**Worked example**:
Example 1
Setup: $K_I=\{\{v_0\},\{v_1\},\{v_0,v_1\}\}$.
Compute: First, the simplex set contains vertices (dimension $0$) and one edge $\{v_0,v_1\}$ (dimension $1$). Then no 2-simplex is present, so maximum simplex dimension is $1$.
Interpret: One-dimensional, connected scaffold.
Common mistake: Calling it 0-dimensional because only two vertices are visually prominent.

Example 2
Setup: $K_H$ has only edges of a triangle; $K_F$ adds $\{v_0,v_1,v_2\}$.
Compute: First, $K_H$ contains only 0- and 1-simplices, so $S_2(K_H)=\varnothing$. Then $K_F$ includes one 2-simplex $\{v_0,v_1,v_2\}$, so $|S_2(K_F)|=1$.
Interpret: Same 1-skeleton (same vertices and edges), different 2-dimensional content.
Common mistake: Assuming they will have identical future homology.

**What this unlocks next**:
Reliable object-level intuition before algebraic encoding.
Remaining gap: Need formal additive structure for simplex combinations.

### Stage 7: Prepare transition to chain groups
**Motivation**:
Bottleneck: We can list simplices but cannot yet add them with coefficients.
Why-now trigger: Questions about multiplicity and cancellation require linear combinations.
Rejected shortcut: Use informal plus/minus annotations without group structure.
Stage objective: Reframe oriented simplices as future generators.
Payoff signal: Chapter 2 starts without conceptual discontinuity.

**Intuition**:
Mental model: We built the alphabet; next chapter builds sentences.
Where it fails: Alphabet alone cannot detect holes until boundary maps are defined.

**Construction step**:
Uses: Stage 4 orientation and Stage 5 face indexing.
For each degree $n$, treat oriented $n$-simplices as generators of a future group $C_n(K)=\bigoplus\mathbb{Z}\sigma^n$.

**Worked example**:
Example 1
Setup: Filled triangle with oriented edges $e_{01},e_{12},e_{20}$.
Compute: First, choose edge basis $(e_{01},e_{12},e_{20})$ for $C_1$. Then the coefficient vector $(2,-1,1)$ defines the chain $2e_{01}-e_{12}+e_{20}$.
Interpret: Coefficients encode multiplicity and direction.
Common mistake: Restricting coefficients to $0$ or $1$.

Example 2
Setup: Two adjacent triangles sharing one edge.
Compute: First, let adjacent oriented 2-simplices induce opposite orientations on shared edge $e_{12}$. Then boundary contributions are $+e_{12}$ and $-e_{12}$, so the shared-edge coefficient sums to $0$ in the combined boundary.
Interpret: Sign cancellation is now anticipated.
Common mistake: Treating opposite orientations as separate geometric edges.

**What this unlocks next**:
Immediate construction of chain groups and boundaries.
Remaining gap: Boundary operator itself is not yet defined.

## 4. Final Concept/Theorem Statement

Formal definition: A simplicial complex $K$ on vertex set $V$ is a finite family of nonempty subsets of $V$ such that if $\sigma\in K$ and $\tau\subseteq\sigma$ is nonempty, then $\tau\in K$. An oriented $k$-simplex is an ordered list of $k+1$ vertices modulo even permutations, with odd permutations changing sign.

Near-miss/non-example: The collection containing $\{v_0,v_1,v_2\}$, $\{v_0,v_1\}$, $\{v_1,v_2\}$, and all singletons but missing $\{v_0,v_2\}$ is not a simplicial complex, because a required face is absent.

Wrong mental model: A simplicial complex is only a drawing of triangles in the plane.

Correction: The definition is combinatorial and works in any dimension; drawings are optional realizations, not the object itself.

Scope boundary: This chapter defines simplices, complexes, orientation, and incidence indexing. It does not define chain groups, boundary maps, cycles, or homology classes.

## 5. How the Thinking Process Could Have Invented It

We started from a practical limitation: pictures are persuasive but unstable for proof and computation. The first response was to keep only finite incidence data. The second response was to enforce closure and orientation so future signed operations would be coherent.

Failed attempt 1: Describe spaces only by drawings and informal region names. This fails because redrawings and relabelings change appearance without changing structure, so statements become ambiguous.

Failed attempt 2: Keep only vertices and edges and ignore higher simplices. This fails because hollow and filled triangles become indistinguishable, so later hole detection cannot separate trivial from nontrivial loops.

Design rule: Before defining invariants, build a combinatorial model that preserves exactly the incidence and orientation information the invariant will use.

Bridge to next chapter: In Chapter 2 we create chain groups from oriented simplices and define $\partial_n$ as the first algebraic machine of simplicial homology.
